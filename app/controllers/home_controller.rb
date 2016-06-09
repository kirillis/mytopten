class HomeController < ApplicationController

  def show
    @lists = List.includes(:user).limit(50)
  end

end
