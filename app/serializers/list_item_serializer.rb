class ListItemSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :description,
             :rank,
             :image_large,
             :image_thumb,
             :link
end
