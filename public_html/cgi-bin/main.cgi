#!/usr/bin/perl -wT

#****** File: main.cgi******
# Created: January 12 2004
# Modified July 15 2004
#
# Version: 0.2.02
#
# ******Creator: Maverick Webdesign Ltd.******
# *****Author: Chris Johannesson******
# ****Copyright (c) 2003-2004 Maverick Webdesign Ltd.****
#

######### NOTE ################
######### REMOVE FOR PRODUCTION SCRIPTS ######################
# CGI script to recieve the information sent back by the splash page
# contains two parameters "script" and "w3c" acceptable values "1" or "-1".
# script = 1 indicates that the browser supports JavaScript and and
# script = -1 indicates that either the browser doesn't support scripts or
# have scripts disabled. For script = -1 check the USER_AGENT to determine
# if it is a newer browser that supports CSS or an older without CSS support.
# w3c = 1 means that the browser supports the W3C DOM model and w3c = -1
# indicates no such support. 
#
# The only legal combinations are w3c = 1 and script = 1, or w3c = -1 and
# script = 1, or w3c = -1 and script = -1. The combination w3c = 1 and
# script = -1 is illigal and should result in a warning of some sort since the
# URL has been tampered with.
#
######### END NOTE ###############################################

my $VERSION_MAJOR = "0";
my $VERSION_MINOR = "2";
my $VERSION_EXTENSION = "02";
my $VERSION = $VERSION_MAJOR . "." . $VERSION_MINOR . "." . $VERSION_EXTENSION;

sub VERSION(){
	return $VERSION;
}

use CGI;
use Carp;
use strict;
$CGI::POST_MAX=1024 * 100;  	# max 100K posts

use lib "modules/perl/";
use lib "modules/perl/MAV/";
use sys;			# Browser and system detection.
use XMLHandler;			# Handles XML documents, returns content within <body> tags.
use MAV::db;			# Database connectivity, handles all db requests and functionalities.
use MAV::visitor;		# Keeps track of visitors and navigation on the site.
use MAV::javascript;		# Assembles JavaScripts based on browser support and desired client-side functionalities.
use MAV::head;			# Creates the content in the <head> tag.

my $q = new CGI;
my $script = $q->param("scripting") ? $q->param("scripting") : "-1";
my $w3c = $q->param("dom") ? $q->param("dom") : "0";
my $page = $q->param("page") ? $q->param("page") : "home";
my $userId = $q->param("userId") ? $q->param("userId") : 'new';
my $currPage = $q->param("currPage") ? $q->param("currPage") : "none";
my $lastPage = $q->param("lastPage") ? $q->param("lastPage") : "home";
my $page_ref = "/htdocs/data/xml/pageRef_new.xml"; # Local URL to page reference.
my %sys = sys::sysIdentification();
my $test = "";
my $text_only = 0;
my (%dtd, $dtd_choice, $charset, $lang, $encoding, $title, $type, @output, @body, $head, @parameters, $form);

if ($page eq "lastPage"){
	$page = $lastPage;
}

if ($currPage eq "none"){
	$currPage = $page unless ($page eq "navTop" || $page eq "navSide");
}else{
	if ($page eq "navTop" || $page eq "navSide"){
	}else {
		$lastPage = $currPage;
		$currPage = $page;
	}
}

# Expand test for text-only browsers when data becomes available.
# Need similar changes in module sys.pm
if ($sys{"browser"} eq "lynx"){
	$text_only = 1;
}

if ($sys{'browserVersion'} > 2) {
	$form = 1;
} else {
	$form = 0;
}

# Set parameters to be sent.
@parameters = ($page, $form, $userId, $currPage, $script, $sys{'browser'}, $sys{'browserVersion'}, $sys{'os'}, $w3c, $lastPage);
# Note: @body[0] = body content, @body[1] = page title to incorporate in the <title> tag in the head.
if ($script eq "3"){
	print $q->redirect("/htdocs/maverick.html");
} else {
	$head = MAV::head::main(@parameters);
	@body = XMLHandler::main(@parameters);
}

$output[0] = $head.$body[0];
#header(-type => $mime_type, -Content_Length => length($data))

if ($body[1] && $body[1] =~ m/(png|gif|jpg)/){
#_Note July 15 changed $output[0] to $body[0] for output of images. They don't need a header!!!! 
	print $q->header(-type => 'image/png', -Content_Length => length($body[0])), $body[0];
}else {
	print $q->header(), "<html>".$output[0]."</html>";
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


