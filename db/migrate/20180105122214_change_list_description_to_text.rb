class ChangeListDescriptionToText < ActiveRecord::Migration
  def change
    change_column :lists, :description, :text
  end
end
