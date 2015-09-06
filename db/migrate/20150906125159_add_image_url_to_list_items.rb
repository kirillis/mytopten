class AddImageUrlToListItems < ActiveRecord::Migration
  def change
    add_column :list_items, :image_url, :string
    add_column :list_items, :link, :string
  end
end
