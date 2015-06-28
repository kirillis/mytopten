class ListItemsController < ApplicationController

  def show
    listItem = ListItem.find(params[:id]).to_json
    render json: listItem
  end

  def update
    @list_item = ListItem.find(params[:id])
    @list_item.update(list_item_params)
    @list_item.save
    respond_to do |format|
      format.json {
        render json: @list_item.to_json
      }
    end
  end

  private
    def list_item_params
      params.require(:list_item).permit(:title, :description)
    end
end
