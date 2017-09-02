class HomeController < ApplicationController

  def show
    @tags = ActsAsTaggableOn::Tag.most_used(20)
    @lists = List.includes(:user, :list_items, :tags).order(cached_votes_total: :desc).limit(50)
  end

end
