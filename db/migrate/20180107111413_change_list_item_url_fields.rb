class ChangeListItemUrlFields < ActiveRecord::Migration
  def change
    change_column :list_items, :image_thumb_url, :text
    change_column :list_items, :image_large_url, :text
  end
end
