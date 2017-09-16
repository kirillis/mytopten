class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(params[:user][:name], params[:user][:password])
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
  
  def edit
    @user = User.find_by(name: params[:name])
    @lists = @user.lists.includes(:list_items)
  end

  def update

    if !current_user.valid_password?(user_params['current_password'])
      flash[:error] = 'Current password doesn´t match.'
      redirect_to user_edit_path(current_user.name)
      return false
    end

    if !user_params['password'].empty?
      current_user.change_password!(user_params['password'])
    end

    current_user.assign_attributes(user_params.except('current_password', 'password', 'password_confirmation'))
    current_user.save(validate: false)

    flash[:success] = "Settings saved."
    redirect_to user_edit_path(current_user.name)
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name, :current_password)
  end
end