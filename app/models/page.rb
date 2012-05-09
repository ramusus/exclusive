class Page < ActiveRecord::Base
  attr_accessible :title, :title_seo, :title_h1, :slug, :content, :person_id, :menu

  belongs_to :person
end