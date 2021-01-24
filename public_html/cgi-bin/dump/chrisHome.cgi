#!/usr/bin/perl

#****** File: chrisHome.cgi******
# Created: April 8 2003

use CGI;
use lib "modules/perl/";
use warnings;
#use strict;
use Generator;

my $q=new CGI;
my $outPut;
my @passTextFile=("../public_html/data/textfiles/mainPage.src,", "../public_html/data/textfiles/chrisData.src");
my $passTemplate="../public_html/lib/templates/html/chrisHome.dwt";

if ($q->param('sendData')) {
 	SWITCH: {
 		if ($q->param('sendData') == "0") {
 			@passTextFile=('../public_html/data/textfiles/mainPage.src,', '../public_html/data/textfiles/chrisData.src');
			 $passTemplate='../public_html/lib/templates/html/chrisHome.dwt';
			 last; };
 		if ($q->param('sendData') == "1") {
 			@passTextFile=('../public_html/data/textfiles/resumePage.src,', '../public_html/data/textfiles/chrisData.src');
			 $passTemplate='../public_html/lib/templates/html/chrisResume.dwt';
			 last;};
 		if ($q->param('sendData') == "2") { 
 			last; };
 		if ($q->param('sendData') == "3") { 
 			last; };
 		if ($q->param('sendData') == "4") { 
 			last; };
 		if ($q->param('sendData') == "6") { 
 			last; };
 	}
 }
 	$outPut=genHtml("@passTextFile", "$passTemplate");


if ($outPut) {

print $q->header;	# Nessecary for the script to work in Netscape Navigator 4.74

print <<HTML;

$outPut

HTML

}

