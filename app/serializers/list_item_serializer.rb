class ListItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rank
end
