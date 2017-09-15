class AmazonSearch

  def initialize(params = {})
    @search_index = params[:search_index] || 'All'
    @response_group = params[:response_group] || 'Large'
    @locale = params[:locale] || 'US'
    @amazon_request = get_amazon_request()
  end

  def search_for(query)
    @items = get_result_items(query)
    @results = []
    unless @items.empty?
      if @items.is_a?(Array)
        @items.each do |item|
          @results << get_result_from_items(item)
        end
      else
        @results << get_result_from_items(@items)
      end
    end
    @results
  end

  private
  def get_result_items(query)
    response = item_search(query)
    hash_result = response.to_h
    items = []
    unless hash_result['ItemSearchResponse']['Items']['TotalResults'] == '0'
      items = hash_result['ItemSearchResponse']['Items']['Item']
    end
    items
  end

  def get_result_from_items(items)
    authors = items['ItemAttributes']['Author']
    if authors.is_a?(Array) then authors = authors.join(', ') end
    thumb_url = items.has_key?('MediumImage') ? items['MediumImage']['URL'] : false
    large_url = items.has_key?('LargeImage') ? items['LargeImage']['URL'] : false
    return {
        title: items['ItemAttributes']['Title'],
        author: authors,
        thumbnail_url: thumb_url,
        large_url: large_url,
        amazon_url: items['DetailPageURL']
      }
  end

  def item_search(query)
    @amazon_request.item_search(
      query: {
        'Keywords' => query,
        'SearchIndex' => @search_index,
        'ResponseGroup' => @response_group
      }
    )
  end

  def get_amazon_request
    request = Vacuum.new(@locale)
    request.configure(
      aws_access_key_id: ENV['AWS_KEY'],
      aws_secret_access_key: ENV['AWS_SECRET'],
      associate_tag: 'tag'
    )
  end
end
