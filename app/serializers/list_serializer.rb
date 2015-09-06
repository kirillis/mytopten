class ListSerializer < ActiveModel::Serializer
  # embed :ids, include: true
  attributes :id, :title
  has_many :list_items
end
