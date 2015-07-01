class AmazonSearch

  def initialize(params = {})
    @search_index = params[:search_index] || 'Books'
    @response_group = params[:response_group] || 'Large'
    @locale = params[:locale] || 'US'
  end

  def get_amazon_request
    request = Vacuum.new(@locale)
    request.configure(
        aws_access_key_id: 'AKIAIMNUYZUH5QMGF6PA',
        aws_secret_access_key: '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',
        associate_tag: 'tag'
    )
    request
  end

  def item_search(query)
    get_amazon_request().item_search(
      query: {
        'Title' => query,
        'SearchIndex' => @search_index,
        'ResponseGroup' => @response_group
      }
    )
  end

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
    return { 
        title: items['ItemAttributes']['Title'],
        author: authors,
        thumbnail_url: thumb_url,
        amazon_url: items['DetailPageURL']
      }
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
end
