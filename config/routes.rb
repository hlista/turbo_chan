Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    get 'boards/:abrv', to: 'api#boards'
    get ':abrv/posts/:num', to: 'api#posts'
    post '/posts', to: 'api#create_post'
    post '/threads', to: 'api#create_thread'
    get ':abrv/threads/:num', to: 'api#threads'
  end
  get ':abrv', to: 'pages#index'
  get ':abrv/thread/:id', to: 'pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
