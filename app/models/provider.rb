# == Schema Information
#
# Table name: providers
#
#  id         :integer          not null, primary key
#  name       :string
#  percent    :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Provider < ActiveRecord::Base
  validates :name, presence: true, length: { maximum: 250 }
  validates :percent, presence: true,
                      numericality: {
                        greater_than_or_equal_to: 0,
                        less_than_or_equal_to: 100
                      }
end
