class List < ActiveRecord::Base
  acts_as_taggable
  acts_as_votable
  has_many :list_items, dependent: :delete_all
  belongs_to :user
  validates :title, presence: true
  validates :description, presence: true

  scope :published, -> { where(public: true) }

  def self.search(search)
    published.where("title LIKE '%#{search}%' OR description LIKE '%#{search}%'")
  end
end
