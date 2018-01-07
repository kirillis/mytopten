class ChangeListItemLinkFields < ActiveRecord::Migration
  def change
    change_column :list_items, :link, :text
  end
end
