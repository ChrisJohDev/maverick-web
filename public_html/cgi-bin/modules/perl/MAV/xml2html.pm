#!/usr/bin/perl -wT

#****** File: xml2html.cgi******
# Created: July 7 2004
# Modified July 16 2004
#
# ******Creator: Maverick Webdesign Ltd.******
# *****Author: Chris Johannesson******
# ****Copyright (c) 2003 - 2004 Maverick Webdesign****
#

package MAV::xml2html;

my $VERSION_MAJOR = "0";
my $VERSION_MINOR = "2";
my $VERSION_EXTENSION = "01";
my $VERSION = $VERSION_MAJOR . "." . $VERSION_MINOR . "." . $VERSION_EXTENSION;

sub VERSION(){
	return $VERSION;
}
################
# Main program
################

use CGI;
use Carp;
use warnings;
use XML::Parser;
use XML::Parser::EasyTree;
use strict;
#use Data::Dumper;
#use CGI::Carp 'fatalsToBrowser';# Comment out for production.
$CGI::POST_MAX=1024 * 100;  # max 100K posts

my $q = new CGI;
my ($parser, $refParser, @xDoc, @xDocRef, $url, $html_page, @path, @p, %pRef, %ref, @x);
##########################
# Initialize some values.
##########################
$pRef{'ok'} = $pRef{'page'} = $pRef{'pageOK'} = $pRef{'urlOK'} = $ref{'on'} = 0;
$p[0] = "undefined";
my $count = 0;	# For testing purposes only, DELETE when done.
my $count2 = 0;	# For testing purposes only, DELETE when done.


################
# Subs.
################
sub main {
	my $ref = shift;
	@p = @_;		# Order: 0=page, 1=frame, 2=userId, 3=currPage, 4=script, 5=browser, 6=browserVersion, 7=os, 8=w3c, 9=lastPage.	
	my (@temp_values, $rv);
	
	if (ref($$ref) eq "ARRAY"){
		@x = @$$ref;
		for (my $i=0; $i<scalar(@x); $i++){
			if ($x[$i]{'name'} && $x[$i]{'name'} eq "page" && $x[$i]{'attrib'}{'name'} eq $p[0]){
				$ref = $x[$i]{'content'};
				$rv = makeTags($ref);
			}
		}
	}
	return $rv;
}

sub makeTags {
	my $ref_x = shift;
	@p = @_ if ($p[0] eq "undefined");
	my $tag="";
	my @temp = @$ref_x if (ref $ref_x eq "ARRAY");

	if (ref $ref_x eq "HASH"){
		my %hash = %$ref_x;	

		foreach my $keys (keys %hash){
			if ($keys eq "type" && $hash{$keys} eq "e" && $hash{'attrib'}{'tag'}){
				$tag .= _subTag($hash{'attrib'});
				$tag .= makeTags($hash{'content'});
				$tag .= '</'.$hash{'attrib'}{'tag'}.'>' if ($hash{'attrib'}{'tag'});
			}elsif ($keys eq "type" && $hash{$keys} eq "t" && $hash{'content'}){
				$tag .= $hash{'content'};
				$tag .= '</'.$hash{'attrib'}{'tag'}.'>' if ($hash{'attrib'}{'tag'});
			}
			
		}
	}elsif (ref $ref_x eq "ARRAY"){
		my @array = @$ref_x;
		for (my $i=0; $i<scalar(@array); $i++){
			my $temp = $array[$i];
			if (ref $temp eq "HASH"){
				my %hash = %$temp;
				foreach my $keys (keys %hash){
					if ($keys eq "type" && $hash{$keys} eq "e" && $hash{'attrib'}{'tag'}){
						$tag .= _subTag($hash{'attrib'});
						$tag .= makeTags($hash{'content'});
						$tag .= '</'.$hash{'attrib'}{'tag'}.'>' if ($hash{'attrib'}{'tag'});
					}elsif ($keys eq "type" && $hash{$keys} eq "t"){
						my $t = $hash{'content'} ? $hash{'content'} : "null";
						$tag .= $t;
						$tag .= '</'.$hash{'attrib'}{'tag'}.'>' if ($hash{'attrib'}{'tag'});
					}
				}
			}
		}
	}
	return $tag;
}

sub _subTag {
	my $ref = shift;
	my ($rv, %hash);
	if (ref $ref eq "HASH"){
		%hash = %$ref;		
		$rv = '<'.$hash{'tag'};
		foreach my $keys (keys %hash){
			if ($keys eq "tag"){
			}else{
				if ($keys eq "href"){
					$rv .= ' '.$keys.'="'.$hash{$keys}.';userId='.$p[2].';scripting='.$p[4].';dom='.$p[8].';currPage='.$p[3].';lastPage='.$p[9].'"';
				}elsif ($keys eq "action"){
					$rv .= ' '.$keys.'="mav_mail.cgi"';
				}elsif ($keys eq "attr_name"){
					$rv .= ' name="'.$hash{$keys}.'"';
				}else {
					$rv .= ' '.$keys.'="'.$hash{$keys}.'"' unless ($keys eq "data_type" || $keys eq "order" || $keys eq "name" || $keys eq "mime_type" || $keys eq "onChange");
				}
			}
		}
	}
	$rv .= '>';

	return $rv;
}





######################################
# Error and other help applications
######################################

# ******** START _readfile ********
sub _readfile {
# ******************************************************
# Name: 		_readfile		(local method)
#
# Version:		1.0
#
# Input:		URI reference
#
# Output:		Document at location URI.
#
#	Last Modified:	January 21 2004
# ******************************************************
my $file = shift;

if (open FILE, $file) {
	local $/ = undef; # Undefine the "Input Record Separator $/" localy
	return <FILE>;
}
return 0;
}
# ******** END _readfile ********

# ******** START _error_ ********
sub _error_ {
# ******************************************************
# Name: 		_error_		(local method)
#
# Version:		1.0
#
# Input:		CGI and scalar.
#
# Output:		HTML page displaying the error.
#
#Last Modified:	August 4 2003
# ******************************************************

my ($q, $reason) = @_;

print	$q->header("text/html"),
		$q->start_html("Error Page"),
		$q->p("Following errors occured: "),
		$q->p( $q->i($reason)),
		$q->end_html;
	exit;
}

# ******** END _error_ ********
return 1;

