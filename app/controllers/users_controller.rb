class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(params[:user][:email], params[:user][:password])
      flash[:info] = "Account created, welcome #{@user.name}!"
      redirect_to root_path
    else
      render 'new'
    end
  end

  def show
    @user = User.find_by(name: params[:name])
    @lists = @user.lists.includes(:list_items)
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name)
  end
end