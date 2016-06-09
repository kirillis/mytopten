class UserSerializer < ActiveModel::Serializer
  # embed :ids, include: true
  attributes :name
end
