#!/usr/bin/perl -wT

#****** File: head.pm ******
# Created: July 5 2004
# Modified July 15 2004
#
# ******Creator: Maverick Webdesign Ltd.******
# *****Author: Chris Johannesson******
# ****Copyright (c) 2003 - 2004 Maverick Webdesign****
#

package MAV::head;

my $VERSION_MAJOR = "0";
my $VERSION_MINOR = "0";
my $VERSION_EXTENSION = "01b";
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
use strict;
#use Data::Dumper;
#use CGI::Carp 'fatalsToBrowser';# Comment out for production.
$CGI::POST_MAX=1024 * 100;  # max 100K posts

my $q = new CGI;
my ($rv);

sub main {
	my @p = @_;	# Order: 0=page, 1=frame, 2=userId, 3=currPage, 4=script, 5=browser, 6=browserVersion, 7=os, 8=w3c, 9=lastPage.
	if ($p[0] eq "logo"){
		$rv = '<head><title>Maverick Webdesign Ltd. - Logo</title></head>';
	}elsif ($p[0] eq "navSide"){
		
	}elsif ($p[0] eq "navTop"){
		
	}else {
	# temporary future default setting. Remake.
		$rv = '<head><title>Maverick Webdesign Ltd. *** Productive Solutions ***</title><link type="text/css" href="../htdocs/lib/111.css" media="screen" rel="stylesheet" rev="stylesheet"><link type="text/css" href="/htdocs/lib/112.css" media="screen" rel="stylesheet" rev="stylesheet"></head>';
	}
	return $rv;
}

######################################
# Error and other help applications
######################################
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

