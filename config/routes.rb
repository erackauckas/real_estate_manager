Rails.application.routes.draw do
  # resources :agent_properties, only: [:index]
  resources :agents, only: [:index, :show, :create, :destroy]
  resources :properties
  resources :clients, only: [:show, :create]
  resources :users, only: [:index, :show, :create, :destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/hello', to: 'application#hello_world'
  get '/authorized_user', to: 'users#show'
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }

  post '/login', to: 'sessions#login'
  post '/signup', to: 'sessions#signup'

  delete '/logout', to: 'sessions#logout'
end
