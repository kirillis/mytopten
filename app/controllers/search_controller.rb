require "#{Rails.root}/lib/amazon_search"

class SearchController < ApplicationController

  def index
    @show_amz = "Showing amazon search template."
  end

  def amazon
    amazon_book_search = AmazonSearch.new
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
