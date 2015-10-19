class HomeController < ApplicationController

  def show
    @lists = List.limit(50)
  end

end
