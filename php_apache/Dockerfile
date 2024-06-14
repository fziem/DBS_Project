FROM php:apache-bookworm
# Enable Apache modules
RUN a2enmod rewrite
# Install PostgreSQL client and its PHP extensions
RUN apt-get update \
    && apt-get install -y libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql\
    && docker-php-ext-install pgsql pdo pdo_pgsql\ 
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/* 
