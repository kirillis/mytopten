class ListItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rank, :image_url, :link
end
