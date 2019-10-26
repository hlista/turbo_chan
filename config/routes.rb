require 'resque/server'
Rails.application.routes.draw do
  root 'pages#index'
    mount ActionCable.server => '/cable'
  mount Resque::Server.new, at: "/resque"
  namespace :api do
    get 'boards', to: 'api#index'
    get 'boards/:abrv', to: 'api#boards'
    get ':abrv/posts/:num', to: 'api#posts'
    get ':abrv/tags/:num', to: 'api#tags'
    post '/posts', to: 'api#create_post'
    post '/threads', to: 'api#create_thread'
    post '/tags', to: 'api#create_tag'
    get ':abrv/threads/:num', to: 'api#threads'
  end
  get ':abrv', to: 'pages#index'
  get ':abrv/thread/:id', to: 'pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
