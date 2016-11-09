class User < ActiveRecord::Base
  authenticates_with_sorcery!
  acts_as_voter

  has_many :lists

  validates :name, length: {minimum: 3}, uniqueness: true
  validates :password, length: {minimum: 3}
  validates :password, confirmation: true
  validates :email, uniqueness: true
end
