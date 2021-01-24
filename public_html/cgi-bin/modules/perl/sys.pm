package sys;


# *********************************************HEADER START*****************************************
# File:			sys.pm
# Version:		1.00 (Functioning module, first revision)
#
# Company:		Maverick Webdesign part of JOHANNESSON INFORMATION TECHNOLOGY
# Author:		Chris Johannesson
#
# Created:		August 20 2003
# Modified:		January 12 2004
#
# Description: 	This module provides system information.
# Methods: 		sysIdentification, (_error_)
#
#			 				****Copyright 2003 Maverick Webdesign Ltd.****
#
# *********************************************HEADER END********************************************


# ************************************** SYS IDENTIFICATION START ************************************

sub sysIdentification {
# **************************************************************************
# Name: 		sysIdentification
#
# Version:		1.00 (Functioning method, first revision)
#
# Input:			None. Gets data from %ENV (HTTP_USER_AGENT)
#
# Output:		Hash (browser => [browserName], browserVersion => [browserVersion],
#						browserRevision => [browserRevision], os => [operatingSystem],
#						osVersion => [OSVersion], renderingEngine => [RenderingEngine],
#						renderingEngineVersion => [REVersion])
#
# Note:			Extracts data from HTTP_USER_AGENT.
#
# Last Modified:	January 12 2004
# **************************************************************************

use strict;
use CGI;

my $q = new CGI;
my ($browser, $browserVersion, $os, $osVersion, $rev, %sysInfo, $temp, $renderingEngine, $renderingEngineVersion);

$temp = $ENV{HTTP_USER_AGENT};


if ($temp=~ m/opera/i) {
	$browser="opera";
	$' =~ m/(\d+.\d+)/;
	$browserVersion = $1;
} elsif ($temp=~ m/msie/i) {
	$browser="msie";
	$' =~ m/(\d+.\d+)/;
	$browserVersion = $1;
} elsif ($temp=~ m/amaya/i) {
	$browser="amaya";
	$' =~ m/(\d+.\d+)/;
	$browserVersion = $1;
} elsif ($temp=~ m/mozilla/i) {
	$browser = "mozilla";
	$' =~ m/(\d+.\d+)/;
	$browserVersion = $1;
	if ($temp=~ m/netscape/i) {
		$browser="netscape";
		$' =~ m/(\d+.\d+)/;
		$browserVersion = $1;
	} elsif ($temp =~ m/firebird/i) {
		$browser = "firebird";
		$' =~ m/(\d+.\d*)/;
		$browserVersion = $1;
	}
	if ($temp =~ m/gecko/i) {
		$renderingEngine = "gecko";
		$' =~ m/(\d+)/;
		$renderingEngineVersion = $1;
		$temp =~ m/rv:/;
		$' =~ m/(\d+.\d*)/;
		$rev = $1;
	}
	#if ($browserVersion eq "0") {
	#	$temp=~ m/mozilla/i;
	#	$' =~ m/(\d+.\d+)/;
	#	$browserVersion = $1;
	#	$browser = "netscape";
	#}
	
	if ($browser eq "mozilla" && $browserVersion < 5) {
		$browser = "netscape";
	}
} elsif ($temp =~ m/lynx/i) {
	$browser = "lynx";
	$' =~ m/(\d+.\d+.\d*)/;
	$browserVersion = $1;
} else {
	$browser="unknown";
	$browserVersion = 0;
}

if ($temp=~ m/windows/i) {
	if ($'=~ m/nt 5/i) {
		$os = "Windows XP";
		$temp =~ m/nt/i;
		$' =~ m/(\d+.\d)/;
		$osVersion = $1;
	} elsif ($'=~ m/\snt \d/i) {
		$os = "Windows NT";
		$' =~ m/(\d+.\d)/;
		$osVersion = $1;
	} elsif ($' =~ m/\s95/) {
		$os = "Windows 95";
		$osVersion = "0";
	} elsif ($' =~ m/\s98/) {
		$os = "Windows 98";
		$osVersion = "0";
	} 
	
} elsif ($temp =~ m/linux/i) {
	$os = "linux";
}

$sysInfo{"browser"} = $browser;
$sysInfo{"browserVersion"} = $browserVersion;
$sysInfo{"browserRevision"} = $rev;
$sysInfo{"os"} = $os;
$sysInfo{"osVersion"} = $osVersion;
$sysInfo{"renderingEngine"} = $renderingEngine;
$sysInfo{"renderingEngineVersion"} = $renderingEngineVersion;


return %sysInfo;

}

# ************************************** SYS IDENTIFICATION END ************************************


#####################
##
## Local Objects, only for local use.
##
#####################

# Help functions.

# Error handler function


# ************************************** _ERROR_ START ************************************

sub _error_ {
# ******************************************************
# Name: 		_error_		(local method)
#
# Version:		1.0
#
# Input:			CGI and scalar.
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

# ************************************** _ERROR_ END ************************************

1;
