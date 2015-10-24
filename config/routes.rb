Mytopten::Application.routes.draw do

  # ROOT
  root 'home#show'

  # USERS
  get 'register' => 'users#new', as: :user_register
  get '/login', to: 'sessions#new', as: :user_log_in
  get '/:name', to: 'users#show', as: 'user'
  resources :sessions, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
  delete '/logout', to: 'sessions#destroy', as: :user_log_out

  # LISTS
  get '/:user_name/lists', to: 'lists#index', as: 'user_lists'
  get '/:user_name/:list_id', to: 'lists#show', as: 'user_list'
  get '/:user_name/:list_id/edit', to: 'lists#edit', as: 'user_list_edit'
  get '/:user_name/lists/new', to: 'lists#new', as: 'user_list_new'
  resources :lists, only: [:index, :create, :update, :destroy]
  resources :list_items, only: [:create, :update, :destroy, :edit]

  # SEARCH
  get 'search/amazon/' => 'search#amazon', as: :search_amazon
  get 'search/' => 'search#index'

end
