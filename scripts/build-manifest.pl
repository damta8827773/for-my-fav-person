#!/usr/bin/env perl
# build-manifest.pl — scans the photo assets and writes a JSON manifest
# (file names, count, total bytes). Used as a small build-time step.
# Pure core Perl, no CPAN modules.
use strict;
use warnings;

my $assets_dir = "apps/web/public/assets";
my $out        = "apps/web/public/manifest.json";

opendir(my $dh, $assets_dir) or die "Cannot open $assets_dir: $!";
my @files = sort grep { /\.(png|jpe?g|webp|gif)$/i } readdir($dh);
closedir($dh);

my $total = 0;
my @items;
for my $f (@files) {
    my $size = -s "$assets_dir/$f" // 0;
    $total += $size;
    ( my $esc = $f ) =~ s/(["\\])/\\$1/g;
    push @items, qq({"file":"$esc","bytes":$size});
}

my $count = scalar @items;
my $json  = qq({"generatedBy":"perl","count":$count,"totalBytes":$total,"assets":[)
          . join( ",", @items ) . qq(]});

open( my $fh, ">", $out ) or die "Cannot write $out: $!";
print $fh $json;
close($fh);

printf "build-manifest.pl: wrote %d assets (%.1f KB) -> %s\n",
    $count, $total / 1024, $out;
