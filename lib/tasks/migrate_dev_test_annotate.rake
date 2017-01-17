namespace :db do
  desc 'Migrate development and prepare test dbs, annotate models'
  task dev_migrate: :environment do
    system('bin/rake db:migrate RAILS_ENV=development')
    system('bin/rake db:test:prepare RAILS_ENV=test')
    system('annotate')
#    Rake::Task['db:dev_cleanup_structure'].invoke
  end

  desc 'Normalize structure.sql'
  task dev_cleanup_structure: :environment do
    Tempfile.open('structure.sql') do |file|
      comments_regex = /^\s*--(?!\s(PostgreSQL database dump|Dumped (from|by))).*?$/

      structure_fn = Rails.root.join('db', 'structure.sql')

      file.write(File.read(structure_fn).gsub(comments_regex, '').gsub(/\n{3,}/, "\n\n"))
      file.close

      FileUtils.cp_r file.path, structure_fn, verbose: true, remove_destination: true
    end
  end
end
