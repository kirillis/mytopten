class ListsController < ApplicationController
  def index
    @lists = List.all
    @new_list = List.new
    respond_to do |format|
      format.html
      format.json { render json: @lists }
    end
  end

  def show
    @list = List.find(params[:id])
    @new_list_item = @list.build_listitem
  end

  def create
    @list = List.new(list_params)
    @list.save
    redirect_to action: :index
  end

  private
    def list_params
      params.require(:list).permit(:title, :description)
    end
end
