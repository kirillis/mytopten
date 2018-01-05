class ChangeListItemDescriptionToText < ActiveRecord::Migration
  def change
    change_column :list_items, :description, :text
  end
end
