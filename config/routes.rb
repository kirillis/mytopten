Mytopten::Application.routes.draw do

  get 'register' => 'users#new', as: :user_register
  get '/login', to: 'sessions#new', as: :user_log_in
  delete '/logout', to: 'sessions#destroy', as: :user_log_out
  get 'search/amazon/' => 'search#amazon', as: :search_amazon
  get 'search/' => 'search#index'

  get '/:name', to: 'users#show', as: 'user'
  get '/:user_name/lists', to: 'lists#index', as: 'user_lists'
  get '/:user_name/:list_id', to: 'lists#show', as: 'user_list'
  get '/:user_name/lists/new', to: 'lists#new', as: 'user_list_new'

  resources :lists, only: [:index, :create, :update, :destroy]
  resources :users, only: [:new, :create]
  resources :list_items

  resources :sessions, only: [:new, :create, :destroy]

  root 'home#show'
end




# --------------------------------------------------------------------------------
# The priority is based upon order of creation: first created -> highest priority.
# See how all your routes lay out with "rake routes".

# You can have the root of your site routed with "root"
# root 'welcome#index'

# Example of regular route:
#   get 'products/:id' => 'catalog#view'

# Example of named route that can be invoked with purchase_url(id: product.id)
#   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

# Example resource route (maps HTTP verbs to controller actions automatically):
#   resources :products

# Example resource route with options:
#   resources :products do
#     member do
#       get 'short'
#       post 'toggle'
#     end
#
#     collection do
#       get 'sold'
#     end
#   end

# Example resource route with sub-resources:
#   resources :products do
#     resources :comments, :sales
#     resource :seller
#   end

# Example resource route with more complex sub-resources:
#   resources :products do
#     resources :comments
#     resources :sales do
#       get 'recent', on: :collection
#     end
#   end

# Example resource route with concerns:
#   concern :toggleable do
#     post 'toggle'
#   end
#   resources :posts, concerns: :toggleable
#   resources :photos, concerns: :toggleable

# Example resource route within a namespace:
#   namespace :admin do
#     # Directs /admin/products/* to Admin::ProductsController
#     # (app/controllers/admin/products_controller.rb)
#     resources :products
#   end
