#!/usr/bin/perl -wT

#****** File: visitor.pm ******
# Created: July 5 2004
# Modified Month Day YYYY
#
# ******Creator: Maverick Webdesign Ltd.******
# *****Author: Chris Johannesson******
# ****Copyright (c) 2003 - 2004 Maverick Webdesign****
#

package MAV::visitor;

my $VERSION_MAJOR = "0";
my $VERSION_MINOR = "0";
my $VERSION_EXTENSION = "01a";
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

