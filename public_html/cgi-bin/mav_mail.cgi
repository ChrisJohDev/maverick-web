#!/usr/bin/perl -wT

#****** File: mav_mail.cgi******
# Created: June 24 2003
#
# Modified: July 18 2004
#
# ******Creator: Maverick Webdesign Ltd. ******
# *****Author: Chris Johannesson******
# ****Copyright 2003-2004 Maverick Webdesign Ltd.****
#

my $VERSION_MAJOR = "0";
my $VERSION_MINOR = "0";
my $VERSION_EXTENSION = "02b";
my $VERSION = $VERSION_MAJOR . "." . $VERSION_MINOR . "." . $VERSION_EXTENSION;

sub VERSION(){
	return $VERSION;
}

use strict;
use CGI;
use warnings;

BEGIN {
	$ENV{PATH} = "/bin:/usr/bin";
	delete @ENV{ qw( IFS CDPATH ENV BASH_ENV ) };
}

my $q = new CGI;
my $email = validate_email_address( $q->param( "email" ) );
my $choice = $q->param("choice");
my $message = $q->param( "message" );	# Write validate_message sub.
my $first_name = $q->param("f_name");	# Write validate_f_name sub.
my $sur_name = $q->param("s_name");		# Write validate_s_name sub.
my $new_location = $q->param("go_to");	# Write validate_go_to sub.
my $self = $q->url;
my $mail_to;

my @test;

my $all_ok = _checkContent($email, $choice, $message, $first_name, $sur_name, $new_location);

if ($all_ok){
	$mail_to = $choice;
	$message = "<pre>".$message."</pre>";


	send_feedback($mail_to, $first_name, $sur_name, $email, $message);
	send_reciept($mail_to, $first_name, $sur_name, $email, $message);
}

print $q->redirect("http://www.maverick-web.com"); #  Set to http://www.maverick-web.com for production.

sub send_feedback {

	my ($to, $f_name, $s_name, $email, $message) = @_;
	
	open (MAIL, '|/usr/sbin/sendmail -oi -t') || die "Could not open send_feedback sendmail: $!";
	
	print MAIL <<END_OF_MESSAGE;
From: $email
Reply-to: $email
To: $to\@maverick-web.com
Subject: Mail to $to

Message from:
$f_name	$s_name \: $email


$message

END_OF_MESSAGE

	close MAIL or die "Could not close send_feedback sendmail: $!";
}

sub send_reciept {

	my ($to, $f_name, $s_name, $email, $message) = @_;
	my $from_email = "donotreply\@maverick-web.com";
	my $from_name = "Do NOT Reply Maverick Webdesign Ltd.";

	open (MAIL, '|/usr/sbin/sendmail -oi -t') || die "Could not open sendmail: $!";
	
	print MAIL <<END_OF_MESSAGE;
From: donotreply\@maverick-web.com
To: $email
Subject: Do NOT Reply (Your confirmation) Maverick Webdesign Ltd.

*****DO NOT REPLY*****

This is an automated confirmation.
Your message has been sent to $to\@maverick-web.com and we will be responding to you shortly.

Regards
Maverick Webdesign Ltd.


Your message:

$message

END_OF_MESSAGE

	close MAIL || die "Could not close send_reciept sendmail: $!";
}

sub validate_email_address {
#
# Source: CGI Programming 2nd Edition p. 219-220 by S. Guelish, S. Gundavaram & G. Birznieks on O'Reill books.
# 
# Continue the work on validating email address and include a set that will detect
# spaces within elements as they are illigal.
#
# Remember the approach / method of building the final Regular Expression.
#
# Name:	validate_email_address
#
# Input:		Any email address to check (string)
# Output:	The submitted email address (with all spaces stripped i.e. without spaces) or
#			an empty string which evaluates to false in Perl.
#
	my $address_to_check = shift;
	$address_to_check =~ s/("(?:[^"\\]|\\.)*"|[^\t "]*)[ \t]*/$1/g;
	
	my $esc			= '\\\\';
	my $space			= '\040';
	my $ctrl			= '\000-\037';
	my $dot			= '\.';
	my $nonASCII		= '\x80-\xff';
	my $CRlist		= '\012\015';
	my $letter		= 'a-zA-Z';
	my $digit			= '\d';
	my $atom_char		= qq{ [^$space<>\@,;:".\\[\\]$esc$ctrl$nonASCII] };
	my $atom			= qq{ $atom_char+ };
	my $byte			= qq{ (?:	1?$digit?$digit	|
									2[0-4]$digit		|
									25[0-5]			) };
	my $qtext			= qq{ [^$esc$nonASCII$CRlist"] };
	my $quoted_pair	= qq{ $esc [^$nonASCII] };
	my $quoted_str	= qq{ " (?: $qtext | $quoted_pair )* " };
	my $word			= qq{ (?: $atom | $quoted_str ) };
	my $ip_address	= qq{ \\[ $byte (?: $dot $byte ) {3} \\] };
	my $sub_domain	= qq{	[$letter$digit]
								[$letter$digit-]{0,61} [$letter$digit]};
	my $top_level		= qq{ (?: $atom_char ){2,4} };
	my $domain_name	= qq{ (?: $sub_domain $dot )+ $top_level };
	my $domain		= qq{ (?: $domain_name | $ip_address ) };
	my $local_part	= qq{ $word (?: $dot $word )* };
	my $address		= qq{ $local_part \@ $domain };
	
	return $address_to_check =~ /^$address$/ox ? $address_to_check : "";
}

sub validate_choice {
	my $value = shift;
	
	if ($value =~ m/info|sales|support/){
$test[0] = "validate_choice OK";
		return 1;
	}else {
$test[0] = "validate_choice NOT OK";
		return 0;
	}
}

sub validate_message {
	my $value = shift;
	my $esc			= '\\\\';
	my $ctrl			= '\000-\037';
	my $dot			= '\.';
	my $digit			= '\d';
	my $notDigit		= '\D';
	my $nonASCII		= '\x80-\xff';
	my $hashBang		= '\#\!';
	my $remove		= '\brm\b';
	my $percent		= '\%';
	my $per			= qq{ (?:$notDigit)+ $percent};
	my $PI			= '\<\?';
	my $run			= '\.\/'; #qq{$dot$esc};
	my $su			= '\bsu\b';
	my $su2			= '\bsu -';
	my $logaccess		= '\bplod\b';

	my $notAllowed	= qq{$ctrl | $nonASCII | $hashBang | $remove | $PI | $run | $su | $su2 | $logaccess | $per};

return $value =~ /$notAllowed/ox ? 0 : 1;
}

sub validate_name {
	my $value = shift;


#$test[2] = "validate_name ";
#$test[2] .= $value =~ m/[a-zA-Z]+/g ? "OK" : "NOT OK";
# Rewrite later. Should only accept a letter in the first place and have a letter in the last place with
# optional dash or space in between words.
	if ($value =~ m/[(\W)|\d]+/ && $1 ne "-"){ 
	
		$value = 0;
	}else {
	}

	return $value;
}

sub validate_url {
	return 1;
}

sub _checkContent{
	my @c = @_;
	my $ok=0;
# Sequence: 0=email, 1=choice, 2=message, 3=first_name, 4=surname, 5=new_location.
	for (my $i=0; $i<scalar(@c); $i++){
		if ($i == 0){
			if (validate_email_address($c[$i])){
				$ok=1;
			}
		}elsif ($ok && $i == 1){
			if (!validate_choice($c[$i])){
				$ok = 0;
			}
		}elsif ($ok && $i == 2){
			if (!validate_message($c[$i])){
				$ok = 0;
			}
		}elsif ($ok && $i == 3){
			if (!validate_name($c[$i])){
				$ok = 0;
			}
		}elsif ($ok && $i == 4){
			if (!validate_name($c[$i])){
				$ok = 0;
			}
		}elsif ($ok && $i == 5){
			if (!validate_url($c[$i])){
				$ok = 0;
			}
		}
	}
	return $ok;
}


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





