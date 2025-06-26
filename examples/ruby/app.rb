require "pry"
require 'sinatra'
require 'sinatra/cross_origin'
require 'json'
require 'net/http'
require 'uri'
require 'dotenv/load'

set :public_folder, 'public'
enable :cross_origin

# For local development, run over HTTP to avoid mixed content issues
# Comment out the line below if you need HTTPS for local testing
set :bind, '0.0.0.0'
set :port, 4567

# Allow CORS for all routes
before do
  response.headers['Access-Control-Allow-Origin'] = "*"
  # Add Content Security Policy to help with mixed content issues
  # More permissive for development/ngrok testing
  # Temporarily commented out for development to avoid mixed content issues
  # response.headers['Content-Security-Policy'] = "frame-src 'self' https://*.recurrente.com https://*.ngrok-free.app http://*.ngrok-free.app; script-src 'self' 'unsafe-inline' https: http:; style-src 'self' 'unsafe-inline' https: http:;"
end

options '*' do
  response.headers['Access-Control-Allow-Methods'] = "GET, POST, OPTIONS"
  response.headers['Access-Control-Allow-Headers'] = "Content-Type"
  200
end

get "/" do
  erb :index
end

get "/success" do
  erb :success
end

get "/failure" do
  erb :failure
end




