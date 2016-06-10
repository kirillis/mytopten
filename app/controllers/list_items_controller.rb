class ListItemsController < ApplicationController

  def show
    listItem = ListItem.find(params[:id]).to_json
    render json: listItem
  end

  def create
    list = List.find(params[:list_id])
    new_list_item = list.list_items.create(list_item_params)
    if new_list_item
      render json: new_list_item, status: :created
    else
      render json: new_list_item.errors, status: :unprocessable_entity
    end
  end

  def update
    list_item = ListItem.find(params[:id])
    list_item.update(list_item_params)
    if list_item.save
      render json: list_item, status: :ok
    else
      render json: list_item, status: :unprocessable_entity
    end
  end

  def destroy
    list_item = ListItem.find(params[:id])

    if list_item.destroy
      render json: list_item, status: :ok
    else
      render json: list_item, status: :unprocessable_entity
    end
  end

  def change_rank
    list_item = ListItem.find(params[:id])
    if list_item.move_to(params[:new_rank].to_i)
      head :ok
    else
      head :internal_server_error
    end
  end

  private
    def list_item_params
      params.require(:list_item).permit(:title, :description, :rank, :list_id, :link, :image_url)
    end
end
