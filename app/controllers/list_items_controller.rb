class ListItemsController < ApplicationController

  def show
    listItem = ListItem.find(params[:id]).to_json
    render json: listItem
  end

  def create
    list = List.find(params[:list_id])
    @new_list_item = list.list_items.create(list_item_params)
    # @new_list_item.save

    respond_to do |format|
      if @new_list_item
        format.html { redirect_to @new_list_item, notice: 'Listitem was successfully created.' }
        format.json { render json: @new_list_item, status: :created, location: @new_list_item }
      else
        format.html { render action: "new" }
        format.json { render json: @new_list_item.errors, status: :unprocessable_entity }
      end
    end
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
      params.require(:list_item).permit(:title, :description, :rank, :list_id, :link, :image_url)
    end
end
