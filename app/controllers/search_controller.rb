require "#{Rails.root}/lib/amazon_search"

class SearchController < ApplicationController

  def show
    @tags = ActsAsTaggableOn::Tag.most_used(20)
  end

  def site
    q = params[:query]
    @tags = ActsAsTaggableOn::Tag.most_used(20)
    @lists = List.search(q).includes(:user, :list_items, :tags)
    render 'site'
  end

  def amazon
    amazon_book_search = AmazonSearch.new()
    @results = []
    if params.has_key?('query')
      @results = amazon_book_search.search_for(params['query'])
    end

    respond_to do |format|
      format.html
      format.json {
        render json: @results, root: false
      }
    end
  end
end
