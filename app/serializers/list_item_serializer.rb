class ListItemSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :description,
             :rank,
             :image_large_url,
             :image_thumb_url,
             :link
end
