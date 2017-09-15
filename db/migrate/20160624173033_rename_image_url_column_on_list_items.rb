class RenameImageUrlColumnOnListItems < ActiveRecord::Migration
  def change
    rename_column :list_items, :image_url, :image_thumb_url
  end
end
