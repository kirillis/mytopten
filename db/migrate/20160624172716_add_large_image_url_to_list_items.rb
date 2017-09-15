class AddLargeImageUrlToListItems < ActiveRecord::Migration
  def change
    add_column :list_items, :image_large_url, :string
  end
end
