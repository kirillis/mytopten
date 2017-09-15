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
      render status: :ok, json: { text: "ListItem with ID #{params[:id]} was updated." }
    else
      render status: :internal_server_error, json: { text: "ListItem with ID #{params[:id]} was not updated." }
    end
  end

  def destroy
    list_item = ListItem.find_by(id: params[:id])

    if list_item and list_item.destroy
      render status: :ok, json: { text: "ListItem with ID #{params[:id]} was deleted." }
    else
      render status: :internal_server_error, json: { text: "ListItem with ID #{params[:id]} was not deleted." }
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
      params.permit(:title, :description, :rank, :list_id, :link, :image_main, :image_large_url, :image_thumb_url)
    end
end
