class HomeController < ApplicationController

  def show
    @tags = ActsAsTaggableOn::Tag.most_used(20)
    @lists = List.includes(:user, :list_items).limit(50)
  end

end
