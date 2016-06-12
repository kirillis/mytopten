class HomeController < ApplicationController

  def show
    @lists = List.includes(:user, :list_items).limit(50)
  end

end
