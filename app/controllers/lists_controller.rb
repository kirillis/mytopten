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
    @list = List.includes(:list_items).find(params[:id])
    @list_id = params[:id]
    @list_json = @list.to_json(include: :list_items)
    respond_to do |format|
      format.html
      format.json {
        render json: @list, root: false
      }
    end
  end

  def create
    @list = List.new(list_params)
    @list.save
    redirect_to action: :index
  end

  def update
    @list = List.find(params[:id])
    @list.update(list_params)
    @list.save
    respond_to do |format|
      format.html
      format.json {
        render json: @list.to_json(:include => :list_items)
      }
    end
  end

  private
    def list_params
      params.require(:list).permit(:title, :description, list_items_attributes: [:title, :description])
    end
end
