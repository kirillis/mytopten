class ListsController < ApplicationController
  def index
    @lists = List.all
    respond_to do |format|
      format.html
      format.json { render json: @lists }
    end
  end

  def show
    @list = List.find(params[:id])
  end
end
