class QwantController < ApplicationController

  def show
    qwant_api_url = "https://api.qwant.com/api/search/images?count=100&offset=1&f=&q="
    qwant_api_url = qwant_api_url + params[:query]
    response = Net::HTTP.get_response(URI(qwant_api_url))
    resp = response.body

    respond_to do |format|
        format.json { render json: resp }
    end
  end
end
