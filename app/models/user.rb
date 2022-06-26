class User < ApplicationRecord
    has_secure_password

    has_many :agent_properties
    has_many :agents, through: :agent_properties

    validates :name, presence: true, uniqueness: true
end
