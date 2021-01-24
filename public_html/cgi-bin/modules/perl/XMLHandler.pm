#!/usr/bin/perl -wT

#****** File: XMLHandler.pm ******
# Created: July 5 2004
# Modified July 16 2004
#
# ******Creator: Maverick Webdesign Ltd.******
# *****Author: Chris Johannesson******
# ****Copyright (c) 2003 - 2004 Maverick Webdesign****
#

package XMLHandler;

require xml2html;

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
use strict;
#use Data::Dumper;
#use CGI::Carp 'fatalsToBrowser';# Comment out for production.
$CGI::POST_MAX=1024 * 100;  # max 100K posts

my $q = new CGI;
my (@parameters, $parser, $refParser, @xDoc, @xDocRef, $url);


# Main function.
sub main {
	@parameters = @_;	# Order: 0=page, 1=frame, 2=userId, 3=currPage, 4=script, 5=browser, 6=browserVersion, 7=os, 8=w3c, 9=lastPage.
	my (@rv, $location, $pageRef);
	my $parser = new XML::Parser(Style => 'EasyTree');
	
		$pageRef = _readfile('../htdocs/data/xml/pageRef_new.xml');		# Remember to change if location changes.
		_getRefURL($pageRef);	# Sets the $url global variable.
		$location = "../htdocs/data/xml/".$url;

	my (@temp_values, %nodes, @xDoc, @x, $temp);
	@xDoc = $parser->parsefile($location) if ($url);
	$temp = $xDoc[0][0];
	%nodes = %$temp;
	my $ref = \$nodes{'content'} if ($nodes{'name'} eq "xml");		# Peels of the <xml> root tag.
	
###########
# Parsers.
###########
$XML::Parser::EasyTree::Noempty=1;
	if ($parameters[0] eq "logo"){
		@rv = main_logo($ref, @parameters);
	}elsif ($parameters[0] eq "navTop"){
		$rv[0] = main_navigation($ref, @parameters);
	}elsif ($parameters[0] eq "navSide"){
		$rv[0] = main_navigation($ref, @parameters);
	}else {
		if ($parameters[1] && $parameters[2] eq "new"){
			$rv[0] = main_frame_new(@parameters);
		}elsif ($parameters[1] && $parameters[2] ne "new"){
			$rv[0] = main_frame($ref, @parameters);
		}else{
			$rv[0] = main_page($ref, @parameters);
		}
	}
	return @rv;
}

sub main_frame_new {
	my @p = @_;
	my $userId = create_id();
	my $opera = "<frameset rows='156px,*' cols='120px,*' frameborder='no'><frameset rows='156px,*' frameborder='no'><frame name='logo' src='http://mav-test/cgi-bin/main.cgi?scripting=".$parameters[4].";page=logo;userId=".$userId."' scrolling='no' noresize><frame name='navSide' src='http://mav-test/cgi-bin/main.cgi?scripting=".$parameters[4].";page=navSide;userId=".$userId."' scrolling='no' noresize></frameset><frameset rows='156px,*' frameborder='no'><frame name='navTop' src='http://mav-test/cgi-bin/main.cgi?scripting=".$parameters[4].";page=navTop;userId=".$userId."' scrolling='no'><frame name='main' src='http://mav-test/cgi-bin/main.cgi?scripting=".$parameters[4].";page=home;userId=".$userId."'></frameset></frameset>";
	my $other = "<frameset rows='156px,450px' cols='120px,620px' frameborder='no'><frame name='logo' src='http://mav-test/cgi-bin/main.cgi?scripting=".$parameters[4].";page=logo;userId=".$userId."' scrolling='no' noresize marginheight='3' marginwidth='70'><frame name='navTop' src='http://mav-test/cgi-bin/main.cgi?scripting=".$parameters[4].";page=navTop;userId=".$userId."' scrolling='no'><frame name='navSide' src='http://mav-test/cgi-bin/main.cgi?scripting=".$parameters[4].";page=navSide;userId=".$userId."' scrolling='no' noresize><frame name='main' src='http://mav-test/cgi-bin/main.cgi?scripting=".$parameters[4].";page=home;userId=".$userId."'></frameset>";

	if ($parameters[5] eq "opera" && $parameters[6] < 6){
		return $opera;
	} else {
		return $other;
	}
}

sub main_frame{
	my $ref = shift;
	my @p = @_;
	my $start_body;
	
	if ($p[0] =~ m/(logo|navSide|navTop)/){
		$start_body = '<body bgcolor="blue">';
	}else {
		$start_body = '<body>';
	}

	return $start_body.MAV::xml2html::main($ref, @parameters).'</body>';
}

sub main_page{
	my $ref = shift;
	my @p = @_;
	
	return MAV::xml2html::main($ref, @parameters);
}

sub main_logo {
	my $ref = shift;
	my @p = @_;
	my (%hash, @array, @rv, @temp);
	
	if (ref $$ref eq "ARRAY"){
		@array = @$$ref;
		for (my $i=0; $i<scalar(@array); $i++){
			if ($array[$i]{'name'} && $array[$i]{'name'} eq "logo"){
				$ref = $array[$i]{'content'};
				@temp = @$ref;
				for (my $j=0; $j<scalar(@temp); $j++){
					if ($temp[$j]{'name'} eq "data"){
						$rv[0] = _readimage("../htdocs/".$temp[$j]{'attrib'}{'src'});
						$rv[1] = "png"; # Image type edit as necessary.
					}
				}
			}
		}
	}
return @rv;
}

sub main_navigation {
	my $ref = shift;
	my @p = @_;
	my (%hash, @array, @rv, @temp, $dump);

	if ($p[0] eq "navTop"){
		if (ref $$ref eq "ARRAY"){
			@array = @$$ref;
			for (my $i=0; $i<scalar(@array); $i++){
				if ($array[$i]{'name'} && $array[$i]{'name'} eq "navigation"){
					$ref = $array[$i]{'content'};

					@temp = @$ref;
					for (my $j=0; $j<scalar(@temp); $j++){
						if ($temp[$j]{'name'} eq "top"){
							$rv[0] = main_navTop($temp[$j]{'content'}, @p);
						}elsif ($temp[$j]{'name'} eq "topad"){
							$rv[0] .= main_topad($temp[$j]{'content'}, @p);
						}
					}
				}
			}
		}
	}elsif ($p[0] eq "navSide"){
		if (ref $$ref eq "ARRAY"){
			@array = @$$ref;
			for (my $i=0; $i<scalar(@array); $i++){
				if ($array[$i]{'name'} && $array[$i]{'name'} eq "navigation"){
					$ref = $array[$i]{'content'};

					@temp = @$ref;
					for (my $j=0; $j<scalar(@temp); $j++){
						if ($temp[$j]{'name'} eq "side"){
							$rv[0] = main_navSide($temp[$j]{'content'}, @p);
							$rv[1] = "";
						}
					}
				}
			}
		}
	}
return $rv[0];
}	

sub main_navTop {
	my $ref = shift;
	my @p = @_;
	my $rv = "<head></head><body><p align='center'>";
	my @array = @$ref if (ref $ref eq "ARRAY");
	my $dump;

	if (ref $ref eq "ARRAY"){
		for (my $i=0; $i<scalar(@array); $i++){
			if ($array[$i]{'type'} eq "e" && $array[$i]{'content'}){
				my $tag = MAV::xml2html::makeTags($array[$i], @p);
				$rv .= $tag;
			}
		}
	}
	$rv =~ s/<img src="graphics\/(?:dot|plus)_12x12(_off)?.png" id="sideMenuImg_\d+"><\/img>//g;
	$rv =~ s/(class="navtop")/$1 target="main"/g;
	$rv =~ s/(graphics\/MavLogo.png)/\.\.\/htdocs\/$1/g;
	$rv .= "</p>";
	return $rv;
}

sub main_navSide {
	my $ref = shift;
	my @p = @_;
	my $rv = "<head></head><body><table style='text-align:center'><tbody><tr><td><hr></td></tr><tr align='center'><td>Menu</td></tr><tr><td><hr></td></tr>";
	my @array = @$ref if (ref $ref eq "ARRAY");
	my $dump;
	for (my $i=0; $i<scalar(@array); $i++){
		if ($array[$i]{'type'} eq "e" && $array[$i]{'content'}){
			my $tag = MAV::xml2html::makeTags($array[$i]{'content'}, @p);
			if ($tag =~ m/id="sad_1"/){
				$tag = "<tr><td><hr></td></tr><tr align='left'><td>".$tag;
			}else {
				$tag = "<tr align='center'><td>".$tag;
			}
			$rv .= $tag."</td></tr>";
		}
	}
	$rv =~ s/<img src="graphics\/(?:dot|plus)_12x12(_off)?.png" id="sideMenuImg_\d+"><\/img>//g;
	$rv =~ s/(class="(?:adside_a|navside)")/$1 target="main"/g;
	$rv =~ s/(graphics\/MavLogo.png)/\.\.\/htdocs\/$1/g;
	$rv .= "</tbody></table></body>";
	return $rv;
}

sub main_topad {
	my $ref = shift;
	my @p = @_;
	my $rv = "<table style='text-align:center' width='100%'><tbody><tr align='center' width='100%'>";
	my @array = @$ref if (ref $ref eq "ARRAY");
	my $dump;
	for (my $i=0; $i<scalar(@array); $i++){
		if ($array[$i]{'type'} eq "e" && $array[$i]{'content'}){
			my $tag = MAV::xml2html::makeTags($array[$i]{'content'}, @p);
			$tag = "<td>".$tag;
			$rv .= $tag."</td>";
		}
	}
	$rv =~ s/(graphics\/[\w\.]*)/\/htdocs\/$1/g;
	$rv .= "</tr></tbody></table></body>";
	if ($p[5] eq "msie" || $p[5] eq "opera"){ # Site specific solution for MSIE and OPERA browsers.
		$rv =~ s|<td>([.\w\W]*)</embed></td>|<td><img alt="Maverick Webdesign Ltd. for Productive Solutions. Contact: info\@maverick-web.com" id="img_2" class="adtop1_1" lowsrc="/htdocs/graphics/lowres/adTop_1.3_low.png" src="/htdocs/graphics/adTop_1.3.png"></td>|;
	}
	return $rv;
}

sub create_id {
	# Note: needs updating. Can produce duplicate ids under special circumstances, i.e. if %ENV is empty.
	my @choice=('a' .. 'g', 'H' .. 'N', '0' .. '3', 'o' .. 'u', 'V' .. 'Z', '4' .. '6', 'A' .. 'G', 'h' .. 'n', '7' .. '9', 'O' .. 'U', 'v' .. 'z');
	my (@code, $unique_id, @number);
	foreach my $i (0..8) {
		$code[$i]=$choice[$number[$i]=int(rand (26*2+9)+0.5)];
	}
	$unique_id= join '', @code;
	return $ENV{'REMOTE_ADDR'}.$ENV{'REMOTE_HOST'}.$unique_id.$ENV{'REMOTE_PORT'};
}

#####################
# Parser subs
#####################
sub ref_start {
	my $expat = shift;
	my $tag = shift;
	my %attr = @_;

	if ($tag eq "page_ref" && $attr{'page'} eq "on" && $attr{'name'} eq $parameters[0]){
		$url = $attr{'url'};
	}elsif ($tag eq "page_ref" && $attr{'page'} eq "off" && $attr{'name'} eq $parameters[0]){
		$url = "doc1.xml";
		$parameters[0] = "default";
	}
# ($tag eq "page_ref" && $attr{'page'} eq "off" && $attr{'name'} eq $parameters[0]) Remove!!!!!
}
sub ref_end {

}

sub ref_char {

}




######################################
# Error and other help applications
######################################

# ******** START _getRefURL ********
sub _getRefURL {
# ******************************************************
# Name: 		_getRefURL		(local method)
#
# Version:		1.0
#
# Input:		Document reference
#
# Output:		Document URI.
#
#	Last Modified:	July 8 2004
# ******************************************************
	my $pageRef = shift;
	my $refParser = XML::Parser->new(Style => 'Stream', Handlers => {
											Start => \&ref_start,
											End => \&ref_end,
											Char => \&ref_char
											}); 
	my $temp = $refParser->parse($pageRef);

}
# ******** END _getRefURL ********

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

# ******** START _readimage ********
sub _readimage {
# ******************************************************
# Name: 		_readimage		(local method)
#
# Version:		1.0
#
# Input:		URI reference
#
# Output:		Document at location URI.
#
#	Last Modified:	July 7 2004
# ******************************************************
my $file = shift;

if (open FILE, $file) {
	binmode FILE;
	local $/ = undef; # Undefine the "Input Record Separator $/" localy
	return <FILE>;
}
return 0;
}
# ******** END _readimage ********


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

