Mytopten::Application.routes.draw do

  # ROOT
  root 'home#show'

  # TAGS
  get 'tags', to: 'tags#index', as: 'tags'
  get 'tags/:tag_name', to: 'tags#show', as: 'tag'
  get 'tags/search/:tag_query', to: 'tags#search', as: 'tags_search'
k
  # SEARCH
  get 'search/amazon' => 'search#amazon', as: :search_amazon
  get 'search' => 'search#index'

  # USERS
  get 'register' => 'users#new', as: :user_register
  get 'login', to: 'sessions#new', as: :user_log_in
  get ':name', to: 'users#show', as: 'user'
  resources :sessions, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
  delete 'logout', to: 'sessions#destroy', as: :user_log_out

  # PASSWORD
  get "password_resets/create"
  get "password_resets/edit"
  get "password_resets/update"
  resources :password_resets

  # LISTS
  get ':user_name/lists', to: 'lists#index', as: 'user_lists'
  get ':user_name/:list_id', to: 'lists#show', as: 'user_list'
  get ':user_name/:list_id/edit', to: 'lists#edit', as: 'user_list_edit'
  get ':user_name/lists/new', to: 'lists#new', as: 'user_list_new'
  put 'lists/:list_id/tags', to: 'lists#update_tags', as: 'list_tags_update'
  delete 'lists/:list_id/tag', to: 'lists#remove_tag', as: 'list_tag_remove'
  resources :lists, only: [:index, :create, :update, :destroy]
  resources :list_items, only: [:create, :update, :destroy, :edit]


end
